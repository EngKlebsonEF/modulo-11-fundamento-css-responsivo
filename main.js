$(document).ready(function(){
$(`#carousel-imagens`).slick({
    autoplay: true,
})});

$('.menu-hamburguer').click(function() {
    $('nav').slideToggle();
})

$(document).ready(function() {
    const carrinhoItens = [];

    class Carrinho {
        constructor() {
            this.tabela = $('#itens-carrinho');
        }

        atualizarTabela() {
            this.tabela.empty();
            carrinhoItens.forEach((item, index) => {
                const $tr = $('<tr>');
                const $tdProduto = $('<td>').text(item.nome);
                const $tdRemover = $('<td>').addClass('remover-item').text('x');

                $tr.append($tdProduto, $tdRemover);
                this.tabela.append($tr);
            });
        }

        adicionarItem(nomeProduto) {
            const item = { nome: nomeProduto };
            carrinhoItens.push(item);
            this.atualizarTabela();
        }

        removerItem(index) {
            carrinhoItens.splice(index, 1);
            this.atualizarTabela();
        }
    }

    const carrinho = new Carrinho();

    $('.botao-adicionar').click(function() {
        const $produto = $(this).closest('.produto');
        const produtoNome = $produto.find('h3').text();

        carrinho.adicionarItem(produtoNome);

        const $button = $(this);
        const $icon = $button.siblings('.feedback-icon');
        $button.addClass('added');
        $button.text('Adicionado');
        $icon.addClass('show-feedback');

        setTimeout(function() {
            $button.removeClass('added');
            $button.text('Adicionar ao Carrinho');
            $icon.removeClass('show-feedback');
        }, 2000);
    });

    $(document).on('click', '.remover-item', function() {
        const index = $(this).closest('tr').index();
        carrinho.removerItem(index);
    });
});